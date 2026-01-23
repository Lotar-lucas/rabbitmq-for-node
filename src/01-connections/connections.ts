import * as amqplib from "amqplib";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect() {
  try {
    const connection = await amqplib.connect(
      "amqp://admin:admin@localhost:5672",
    );

    console.log("Connected to RabbitMQ");

    const channel = await connection.createChannel();
    console.log("Channel created");

    await sleep(30000);

    //close connection after 30 seconds
    //evitar memory leak

    await channel.close();
    await connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Connection failed, retrying in 5 seconds...", error);
  }
}

connect();
