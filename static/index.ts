import {Router} from "./src/modules/Router.js";
import {DialogPage} from "./src/modules/blocks/DialogPage/DialogPage.js";

const router = new Router("root");

router.use('/', DialogPage).start()