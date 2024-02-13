using System;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MiappSignalR.Hubs
{
	public class PositionHub : Hub
    {
        private const string MongoConnectionString = "";


        public async Task SendPosition(int left, int top)
		{
            // Connect to your Atlas cluster
            var client = new MongoClient(MongoConnectionString);
            var texto1 = "text";
            // Send a ping to confirm a successful connection
            try
            {
                Console.WriteLine("hola mundo ..." + texto1);

                //conectar a BD mongoDB
                var database = client.GetDatabase("bdequipos");
                var collection = database.GetCollection<BsonDocument>("semaforos");

                var filter = new BsonDocument();
                var semaforos = await collection.Find(filter).ToListAsync();

                foreach (var semaforo in semaforos)
                {
                    Console.WriteLine(semaforo.ToJson());
                }

                // Insertar un nuevo documento
                var nuevoSemaforo = new BsonDocument
        {
            { "nombre", "NuevoSemaforo" },
            { "color", "Verde" },
            { "estado", "Encendido" }
            // Puedes agregar más campos según sea necesario
        };

                await collection.InsertOneAsync(nuevoSemaforo);
                Console.WriteLine("Nuevo semáforo insertado correctamente.");

                Console.WriteLine("Successfully connected to Atlas " + texto1);




                //conectar a BD mongoDB

            }
            catch (Exception e) { Console.WriteLine(e); }



            await Clients.Others.SendAsync("ReceivePosition", left, top);
		}
       
    }
}

