import { LemmyHelperExtension } from "./lemmy-helper";

let main = new LemmyHelperExtension();

main.ready(async () => {
    await main.loadPlugins();
});