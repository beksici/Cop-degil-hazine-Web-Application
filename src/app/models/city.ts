export interface City {
  name: string;
  alpha_2_code: string;
  towns: [
    {
      name: string;
      districts: [
        {
          name: string;
          quarters: [
            {
              name: string;
            },
            {
              name: string;
            }
          ];
        }
      ];
    }
  ];
}
