import { ILinks } from "./link.interface.js";
export declare const LinksServices: {
    saveOrUpdateLinksInDB: (payload: ILinks) => Promise<ILinks | null>;
    getLatestLinksFromDB: () => Promise<ILinks | null>;
};
//# sourceMappingURL=link.service.d.ts.map