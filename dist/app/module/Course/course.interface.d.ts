export interface IPaymentMethod {
    name: string;
    number: string;
}
export interface ICourse {
    name: string;
    length: string;
    price: number;
    discountPrice: number | null;
    description?: string;
    paymentMethods: IPaymentMethod[];
}
//# sourceMappingURL=course.interface.d.ts.map