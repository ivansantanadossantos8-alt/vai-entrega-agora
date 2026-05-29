-- ===================================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- Execute este código no SQL Editor do Supabase
-- ===================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE couriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Política para inserir perfil de courier (necessário no signup)
CREATE POLICY "Allow users to insert their own courier profile"
  ON couriers FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Couriers podem ver o próprio perfil
CREATE POLICY "Couriers can view own profile"
  ON couriers FOR SELECT
  USING (auth.uid() = id);

-- Couriers podem atualizar o próprio perfil
CREATE POLICY "Couriers can update own profile"
  ON couriers FOR UPDATE
  USING (auth.uid() = id);

-- Vehicles: insert
CREATE POLICY "Couriers can insert own vehicles"
  ON vehicles FOR INSERT
  WITH CHECK (auth.uid() = courier_id);

-- Vehicles: select
CREATE POLICY "Couriers can view own vehicles"
  ON vehicles FOR SELECT
  USING (auth.uid() = courier_id);

-- Vehicles: update
CREATE POLICY "Couriers can update own vehicles"
  ON vehicles FOR UPDATE
  USING (auth.uid() = courier_id);

-- Deliveries: todos podem ver entregas disponíveis, e os donos podem ver as suas
CREATE POLICY "Anyone can view available deliveries"
  ON deliveries FOR SELECT
  USING (status = 'available' OR courier_id = auth.uid());

-- Deliveries: couriers podem aceitar corridas (update)
CREATE POLICY "Couriers can accept deliveries"
  ON deliveries FOR UPDATE
  USING (status = 'available' OR courier_id = auth.uid());

-- Reviews: couriers podem ver as próprias avaliações
CREATE POLICY "Couriers can view own reviews"
  ON reviews FOR SELECT
  USING (auth.uid() = courier_id);


-- ===================================================
-- DADOS DE TESTE (Entregas disponíveis para demonstração)
-- ===================================================

INSERT INTO deliveries (store_name, pickup_address, delivery_address, distance_to_store, distance_to_customer, price, payment_method, tags, status) VALUES
  ('Pizza Prime', 'Rua Augusta, 500 - Centro', 'Rua Haddock Lobo, 800 - Jardins', 1.2, 3.0, 7.50, 'online', ARRAY['Pronto para retirar'], 'available'),
  ('Sushi House', 'Av. Paulista, 1200 - Bela Vista', 'Rua Consolação, 300 - Vila Nova', 2.5, 4.5, 9.00, 'cash', ARRAY['Pagamento na entrega'], 'available'),
  ('Mercado Bom Preço', 'Rua Oscar Freire, 100 - Pinheiros', 'Rua Teodoro Sampaio, 500 - São Jorge', 1.0, 2.1, 6.80, 'online', ARRAY['Volumoso'], 'available'),
  ('Lanchonete do Zé', 'Av. Brigadeiro, 900 - Itaim Bibi', 'Rua Funchal, 200 - Jardim Paulistano', 0.8, 3.9, 8.20, 'online', ARRAY['Pronto para retirar'], 'available'),
  ('La Brasa Burger', 'Rua Artur de Azevedo, 300 - Pinheiros', 'Rua Cardeal Arcoverde, 700 - Centro', 1.5, 2.8, 8.50, 'online', ARRAY['Pronto para retirar'], 'available'),
  ('Açaí da Vila', 'Rua Pamplona, 150 - Jardim Paulista', 'Rua Bela Cintra, 400 - Consolação', 0.6, 1.5, 5.50, 'online', ARRAY['Leve'], 'available'),
  ('Padaria Pão Quente', 'Rua da Consolação, 1000 - Centro', 'Av. Rebouças, 500 - Pinheiros', 2.0, 3.2, 7.00, 'cash', ARRAY['Pagamento na entrega'], 'available');
