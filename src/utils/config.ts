
const env = process.env.NEXT_PUBLIC_production as "production" | "dev";

export const config = {
  serverBaseApi: process.env.SERVER_BASE_API,

  clientBaseApi: process.env.NEXT_PUBLIC_BASE_API,

  hasSSL: process.env.HAS_SSL == "true" ? true : false,

  //   myDomain: process.env.MY_DOMAIN,

  MAP_KEY: process.env.NEXT_PUBLIC_MAP_KEY,

  env: env
};

export const placeHolderBlurImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWnpaaXiDhOAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII='

export const timeSlotOptions = [
  { label: "12:00 AM", value: 0 },
  { label: "12:30 AM", value: 30 },
  { label: "1:00 AM", value: 60 },
  { label: "1:30 AM", value: 90 },
  { label: "2:00 AM", value: 120 },
  { label: "2:30 AM", value: 150 },
  { label: "3:00 AM", value: 180 },
  { label: "3:30 AM", value: 210 },
  { label: "4:00 AM", value: 240 },
  { label: "4:30 AM", value: 270 },
  { label: "5:00 AM", value: 300 },
  { label: "5:30 AM", value: 330 },
  { label: "6:00 AM", value: 360 },
  { label: "6:30 AM", value: 390 },
  { label: "7:00 AM", value: 420 },
  { label: "7:30 AM", value: 450 },
  { label: "8:00 AM", value: 480 },
  { label: "8:30 AM", value: 510 },
  { label: "9:00 AM", value: 540 },
  { label: "9:30 AM", value: 570 },
  { label: "10:00 AM", value: 600 },
  { label: "10:30 AM", value: 630 },
  { label: "11:00 AM", value: 660 },
  { label: "11:30 AM", value: 690 },

  { label: "12:00 PM", value: 720 },
  { label: "12:30 PM", value: 750 },
  { label: "1:00 PM", value: 780 },
  { label: "1:30 PM", value: 810 },
  { label: "2:00 PM", value: 840 },
  { label: "2:30 PM", value: 870 },
  { label: "3:00 PM", value: 900 },
  { label: "3:30 PM", value: 930 },
  { label: "4:00 PM", value: 960 },
  { label: "4:30 PM", value: 990 },
  { label: "5:00 PM", value: 1020 },
  { label: "5:30 PM", value: 1050 },
  { label: "6:00 PM", value: 1080 },
  { label: "6:30 PM", value: 1110 },
  { label: "7:00 PM", value: 1140 },
  { label: "7:30 PM", value: 1170 },
  { label: "8:00 PM", value: 1200 },
  { label: "8:30 PM", value: 1230 },
  { label: "9:00 PM", value: 1260 },
  { label: "9:30 PM", value: 1290 },
  { label: "10:00 PM", value: 1320 },
  { label: "10:30 PM", value: 1350 },
  { label: "11:00 PM", value: 1380 },
  { label: "11:30 PM", value: 1410 },
];
