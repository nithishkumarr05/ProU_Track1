export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "seeds", label: "Seeds" },
      { id: "oil", label: "Oil" },
      { id: "jaggery", label: "Jaggery" },
      { id: "nuts", label: "Nuts" },
      { id: "Ghee_oilcakes", label: "Ghee_oilcakes" },
    ],
  },
  {
    label: "Type",
    name: "type",
    componentType: "select",
    options: [
      { id: "Coconut oil", label: "Coconut oil" },
      { id: "Other", label: "Other" },
      { id: "Castor oil", label: "Castor oil" },
      { id: "Sesame oil", label: "Sesame oil" },
      { id: "Groundnut oil", label: "Groundnut oil" },
      { id: "woodpressed oil", label: "woodpressed oil" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "oil",
    label: "Oil",
    path: "/shop/listing",
  },
  {
    id: "jaggery",
    label: "Jaggery",
    path: "/shop/listing",
  },
  {
    id: "nuts",
    label: "Nuts",
    path: "/shop/listing",
  },
  {
    id: "seeds",
    label: "Seeds",
    path: "/shop/listing",
  },
  {
    id: "Ghee_oil cakes",
    label: "ghee_oil cakes",
    path: "/shop/listing",
  },
  {
    id: "grinding-bookings",
    label: "Grinding Service",
    path: "/shop/grinding-bookings",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  Seeds: "seeds",
  Jaggery: "jaggery",
  Oil: "oil",
  Ghee_oilcakes:"ghee_oilcakes",
  Nuts: "nuts",
};

export const brandOptionsMap = {
  Coconutoil: "Coconut oil",
  Other: "Other",
  EuroChem: "EuroChem",
  HANS: "HANS",
  Sinofert: "Sinofert",
  "Mosaic": "Mosaic",
};

export const filterOptions = {
  category: [
    { id: "Oils", label: "Oils" },
    { id: "Seeds", label: "Seeds" },
    { id: "Jaggery", label: "Jaggery" },
    { id: "Nuts", label: "Nuts" },
    { id: "Ghee & Oil Cakes", label: "Ghee & Oil Cakes" },
  ],
  brand: [
    { id: "Sri Raja", label: "Sri Raja" },
  ],
  featured: [
    { id: "true", label: "Featured Products" },
    { id: "false", label: "Regular Products" },
  ],
  priceRange: [
    { id: "0-200", label: "Under ₹200" },
    { id: "200-500", label: "₹200 - ₹500" },
    { id: "500-1000", label: "₹500 - ₹1000" },
    { id: "1000+", label: "Above ₹1000" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
