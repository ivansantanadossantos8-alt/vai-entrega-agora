// Shim to prevent Leaflet and other browser-only code from crashing during Server-Side Rendering (SSR)
if (typeof window === "undefined") {
  const noop = () => {};
  const mockElement = {
    style: {},
    getElementsByTagName: () => [],
    appendChild: noop,
    removeChild: noop,
    setAttribute: noop,
    removeAttribute: noop,
  };

  const win = {
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: noop,
    location: {
      href: "",
      hash: "",
    },
    navigator: {
      userAgent: "ssr",
      platform: "",
    },
    screen: {},
    devicePixelRatio: 1,
    requestAnimationFrame: (cb: any) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: any) => clearTimeout(id),
  };

  const doc = {
    createElement: () => mockElement,
    documentElement: {
      style: {},
    },
    body: mockElement,
    addEventListener: noop,
    removeEventListener: noop,
    activeElement: null,
  };

  // Safely define window
  if (typeof (global as any).window === "undefined") {
    (global as any).window = win;
  }

  // Safely define document
  if (typeof (global as any).document === "undefined") {
    (global as any).document = doc;
  }

  // Safely define self
  if (typeof (global as any).self === "undefined") {
    (global as any).self = (global as any).window;
  }

  // Safely define navigator if not present, otherwise override properties safely
  if (typeof (global as any).navigator === "undefined") {
    try {
      (global as any).navigator = win.navigator;
    } catch (e) {
      // ignore
    }
  } else {
    // If navigator is read-only, try defining properties on it
    try {
      if (!(global as any).navigator.userAgent) {
        Object.defineProperty((global as any).navigator, "userAgent", {
          value: "ssr",
          writable: true,
          configurable: true,
        });
      }
    } catch (e) {
      // ignore
    }
  }
}
