declare module '*.jpg' {
  const src: string;
  // @ts-ignore
  export default src;
}
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  // @ts-ignore
  export default src;
}
declare module '*.module.css' {
  const classes: { [key: string]: string };
  // @ts-ignore
  export default classes;
}
