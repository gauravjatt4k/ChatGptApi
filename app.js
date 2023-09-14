import express from "express";
import cors from "cors";
import main from "./api.js"

    const app = express();
    const port = 3000;
    app.use(express.json());
    app.use(cors());

    const path = require('path')
    app.use('/', express.static(path.join(__dirname, 'public')))

    app.post('/apiv1', async (req, res) => {
        const message = req.body

        if (!message.message || message.message == " ") {
            res.status(400).json({
                status: "error",
                devmessage: "Dear developer, please note that a message is required !",
            })
        }

        console.log('\n 🤣 User sending :-', message.message);
        try {
                const { timeing, text } = await main(message);
            res.status(200).json({
                status: "done",
                timeing: timeing,
                language: message.language,
                message: text,
        })
        } catch (error) {
                res.status(400).json({
                    status: "error",
                    devmessage: "Hello, dev Please read all documents find errors, and fix",
                })
        }


    })


    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });