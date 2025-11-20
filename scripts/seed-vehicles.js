const API_URL = 'http://localhost:3000/vehicles';

const vehicles = [
  { make: 'Toyota', model: 'Corolla', year: 2023, description: 'Sedán compacto confiable' },
  { make: 'Honda', model: 'Civic', year: 2022, description: 'Sedán deportivo' },
  { make: 'Ford', model: 'Mustang', year: 2024, description: 'Auto deportivo clásico' },
  { make: 'Tesla', model: 'Model 3', year: 2023, description: 'Vehículo eléctrico' },
  { make: 'Chevrolet', model: 'Silverado', year: 2021, description: 'Camioneta pickup robusta' }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForAPI(maxRetries = 10, delay = 3000) {
  console.log('comunicacion');
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      await fetch(API_URL);
      return true;
    } catch (error) {
      if (i < maxRetries - 1) {
        await sleep(delay);
      }
    }
  }
  throw new Error('No se pudo conectar con la API');
}

async function createVehicles() {
  console.log('==========================\n');

  let success = 0;
  let errors = 0;

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    console.log(`Creando vehículo ${i + 1}/5: ${vehicle.make} ${vehicle.model}...`);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Vehículo creado (HTTP ${response.status})`);
        console.log(JSON.stringify(data, null, 2));
        success++;
      } else {
        console.log(`Error (HTTP ${response.status})`);
        errors++;
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      errors++;
    }

    console.log('');
  }


  console.log('\n Proceso de seed finalizado correctamente\n');
  process.exit(errors > 0 ? 1 : 0);
}

async function main() {
  try {
    await waitForAPI();
    await createVehicles();
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
}

main();
