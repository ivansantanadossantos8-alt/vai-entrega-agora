-- Esquema do Banco de Dados para o app Vai Entrega Agora

-- Tabela de Entregadores (Couriers)
CREATE TABLE couriers (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  city TEXT,
  state TEXT,
  address TEXT,
  birth_date DATE,
  photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked')),
  rating NUMERIC(3, 2) DEFAULT 5.00,
  total_deliveries INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Veículos (Vehicles)
CREATE TABLE vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  courier_id UUID REFERENCES couriers(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bicycle', 'motorcycle', 'car', 'other')),
  brand TEXT,
  model TEXT,
  color TEXT,
  year INTEGER,
  plate TEXT,
  document_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Entregas Disponíveis / Em Andamento (Deliveries)
CREATE TABLE deliveries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_name TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  distance_to_store NUMERIC,
  distance_to_customer NUMERIC,
  price NUMERIC(10, 2) NOT NULL,
  payment_method TEXT,
  tags TEXT[], -- ex: 'Pronto para retirar', 'Pagamento na entrega'
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'accepted', 'pickup', 'delivering', 'completed', 'cancelled')),
  courier_id UUID REFERENCES couriers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Avaliações (Reviews)
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  courier_id UUID REFERENCES couriers(id) ON DELETE CASCADE NOT NULL,
  delivery_id UUID REFERENCES deliveries(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Políticas de Segurança (RLS - Row Level Security)

-- Couriers podem ler e atualizar apenas o próprio perfil
ALTER TABLE couriers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Couriers can view own profile" ON couriers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Couriers can update own profile" ON couriers FOR UPDATE USING (auth.uid() = id);

-- Couriers podem ler todos os veículos, mas alterar apenas os próprios
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Couriers can view own vehicles" ON vehicles FOR SELECT USING (auth.uid() = courier_id);
CREATE POLICY "Couriers can manage own vehicles" ON vehicles FOR ALL USING (auth.uid() = courier_id);

-- Entregas: todos podem ver entregas disponíveis, mas apenas os donos podem ver as aceitas
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view available deliveries" ON deliveries FOR SELECT USING (status = 'available' OR courier_id = auth.uid());
CREATE POLICY "Couriers can accept deliveries" ON deliveries FOR UPDATE USING (status = 'available' OR courier_id = auth.uid());

-- Avaliações: couriers podem ler as próprias avaliações
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Couriers can view own reviews" ON reviews FOR SELECT USING (auth.uid() = courier_id);
