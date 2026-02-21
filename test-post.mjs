
async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Test Product",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "men",
        description: "Test description"
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Fetch failed:', e);
  }
}
test();
