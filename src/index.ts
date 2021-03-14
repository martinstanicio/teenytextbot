import dotenv from "dotenv";
import { Context, Telegraf } from "telegraf";
import smallify from "./utils/smallify";

dotenv.config();
const { TOKEN } = process.env;

if (typeof TOKEN === "undefined") throw Error("`TOKEN` is undefined");

const bot = new Telegraf(TOKEN);

bot.start(({ reply }: Context) =>
  reply(
    "Tag me in another chat to get your text transformed into small letters"
  )
);
bot.on("message", ({ reply }: Context) =>
  reply("Sorry, I can only interact by being tagged inline")
);

bot.on("inline_query", ({ inlineQuery, reply }) => {
  console.log(inlineQuery);
  reply(smallify(inlineQuery.query));
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
