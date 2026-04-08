import * as routingService from "./src/services/routing.service.js";
import * as themeService from "./src/services/theme.service.js";
import * as messageService from "./src/services/message.service.js";

async function main() {
    messageService.init();
    let theme = await themeService.init();
    await routingService.initAsync(theme);
}

main();