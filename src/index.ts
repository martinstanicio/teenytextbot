import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import smallify from "./utils/smallify";

dotenv.config();
const { TOKEN } = process.env;

if (typeof TOKEN === "undefined") throw Error("`TOKEN` is undefined");

const bot = new Telegraf(TOKEN);

bot.start(ctx =>
  ctx.reply(
    "Send me a message or tag me in another chat to get your text transformed into small letters!"
  )
);

bot.on("text", ctx => ctx.reply(smallify(ctx.message.text)));

bot.on("inline_query", ctx => {
  const { query } = ctx.inlineQuery;
  if (!query) return;

  const answer = smallify(query);
  ctx.answerInlineQuery([
    {
      type: "article",
      id: "0",
      title: answer,
      input_message_content: { message_text: answer },
    },
  ]);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
