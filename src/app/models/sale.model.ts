export interface Sale{
   client: string;
   country: {
     name: string,
     code: string
   };
   product: string;
   price: number;
   quantity: number;
}
