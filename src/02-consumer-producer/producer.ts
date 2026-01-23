import * as amqplib from "amqplib";

async function producer() {
  const connection = await amqplib.connect("amqp://admin:admin@localhost:5672");
  const channel = await connection.createChannel();

  const queue = "hello";
  const message = "Hello World! 1";

  await channel.assertQueue(queue); // cria a fila se não existir
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(" [x] Sent %s", message);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

producer().catch(console.error);
