import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import cors from "cors";
import main from "./Api.js";

const app = express();
const port = 80;
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(path.join(__dirname, "public")));

// custum middleware
let reqnumber = 0;
app.use((req, res, next) => {
	reqnumber = reqnumber + 1;
	console.log(`
    *New request came :-
	method :- ${req.method.toLowerCase()}
	request number :- ${reqnumber}
	request on :- ${req.originalUrl}
	request with :- ${req.get("referrer")}
	`);
	next();
});
app.post("/apiv1", async (req, res) => {
	const message = req.body;

	if (!message.message || message.message == " ") {
		res.status(400).json({
			status: "error",
			devmessage: "Dear developer, please note that a message is required !",
		});
	}

	console.log("\n 🤣 User sending :-", message.message);
	try {
		const { timeing, text } = await main(message);
		res.status(200).json({
			status: "done",
			timeing: timeing,
			language: message.language,
			message: text,
		});
	} catch (error) {
		res.status(400).json({
			status: "error",
			devmessage: "Hello, dev Please read all documents find errors, and fix",
		});
	}
});

app.listen(port, () => {
	console.log(`ChatGptApi app listening localhost on port ${port}!`);
});
