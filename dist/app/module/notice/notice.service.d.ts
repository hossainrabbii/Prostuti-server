import { INotice } from "./notice.interface.js";
export declare const NoticeServices: {
    createNoticeIntoDB: (payload: INotice) => Promise<INotice>;
    getAllNoticesFromDB: () => Promise<INotice[]>;
    getSingleNoticeFromDB: (id: string) => Promise<INotice | null>;
    updateNoticeInDB: (id: string, payload: Partial<INotice>) => Promise<INotice | null>;
    deleteNoticeFromDB: (id: string) => Promise<INotice | null>;
};
//# sourceMappingURL=notice.service.d.ts.map