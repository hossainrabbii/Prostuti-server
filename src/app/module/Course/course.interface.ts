export interface IPaymentMethod {
  name: string;   // যেমন: "Bkash", "Nagad"
  number: string; // যেমন: "01992393"
}

export interface ICourse {
  name: string;
  length: string;
  price: number;
  discountPrice: number | null;
  description?: string;
  paymentMethods: IPaymentMethod[]; // ডাইনামিক পেমেন্ট মেথড অ্যারে
}