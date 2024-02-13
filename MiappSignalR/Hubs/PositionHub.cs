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


                var database = client.GetDatabase("bdequipos");
                var collection = database.GetCollection<BsonDocument>("semaforos");

                var filter = new BsonDocument();
                var semaforos = await collection.Find(filter).ToListAsync();

                foreach (var semaforo in semaforos)
                {
                    Console.WriteLine(semaforo.ToJson());
                }


                Console.WriteLine("Successfully connected to Atlas "+ texto1);
            }
            catch (Exception e) { Console.WriteLine(e); }



            await Clients.Others.SendAsync("ReceivePosition", left, top);
		}
       
    }
}

