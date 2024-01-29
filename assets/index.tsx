import React, { FC, SVGProps, ReactSVGElement } from "react";
interface GoogleIconProps extends SVGProps<ReactSVGElement> {}

interface GithubIconProps extends SVGProps<ReactSVGElement> {
  className?: string;
}

export const GoogleIcon: FC<GoogleIconProps> = () => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);
export const GithubIcon: FC<GithubIconProps> = ({ className }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 16 16"
    height="24"
    width="24"
    className={className}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
    </svg>
  );
}
export const TwitterIcon = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`cursor-pointer ${className}`}
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z"
      fill="#fff"></path>
  </svg>
);

export function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 16" fill="currentColor" height="30" width="30">
      <path
        fill="currentColor"
        d="M5.375 2.647l.006-.028.016-.118-.74-.004c-.668-.004-.873 0-.891.017-.009.008-.24.885-.651 2.473-.196.758-.361 1.363-.367 1.345s-.24-.883-.522-1.922a107.288 107.288 0 00-.524-1.901c-.01-.01-.906-.014-1.632-.008-.105.001-.164-.205.938 3.299.152.485.381 1.172.507 1.526.146.408.25.724.321.987.126.501.13.815.103 1.182-.032.423-.036 3.413-.005 3.463.024.038 1.425.056 1.558.02.021-.006.035-.026.045-.139.033-.097.036-.484.036-2.09V8.698l.09-.283c.059-.185.206-.672.328-1.082l.327-1.09c.529-1.724 1.033-3.419 1.047-3.516l.011-.079zM13.221 5.135v.107h-.017l-.009 2.953-.009 2.863-.229.233c-.257.261-.462.361-.648.314-.203-.051-.197.028-.214-3.356l-.016-3.115h-1.474v.107h-.017v3.38c0 3.621 0 3.619.184 3.982.146.29.36.431.725.479.481.064 1-.154 1.481-.622l.209-.203v.351c0 .303.009.353.064.368.09.025 1.206.027 1.326.002l.1-.021v-.104l.017-.003V5.114l-1.472.02zM9.483 6.661c-.14-.599-.401-1.002-.832-1.28-.676-.437-1.449-.484-2.165-.13-.522.258-.859.686-1.032 1.314a1.383 1.383 0 00-.047.231c-.044.222-.049.552-.061 2.093-.018 2.374.01 2.656.307 3.195.292.529.897.917 1.556.997.198.024.6-.013.832-.078.525-.146 1.029-.561 1.252-1.032a1.8 1.8 0 00.189-.604c.065-.353.07-.925.07-2.381 0-1.857-.006-2.06-.068-2.326zM7.802 11.5a.688.688 0 01-.515.098c-.135-.029-.318-.241-.374-.434-.07-.241-.075-3.594-.015-4.251.1-.329.378-.501.682-.419.237.064.358.212.427.523.051.231.057.518.046 2.207-.007 1.12-.011 1.668-.048 1.962-.037.185-.099.235-.203.315zM35.944 8.346h.712l-.011-.645c-.011-.592-.02-.659-.099-.82-.125-.253-.309-.366-.601-.366-.351 0-.573.17-.678.518-.045.148-.092 1.167-.058 1.255.019.049.121.058.735.058zM31.184 6.879a.49.49 0 00-.477-.278.914.914 0 00-.508.203l-.127.097v4.634l.127.097c.288.22.604.266.822.12a.482.482 0 00.186-.263c.057-.164.062-.375.055-2.325-.008-2.032-.012-2.152-.078-2.285z"
      />
      <path
        fill="currentColor"
        d="M40.014 4.791c-.142-1.701-.255-2.253-.605-2.962C38.944.89 38.273.395 37.317.286c-.739-.084-3.521-.203-6.094-.26-4.456-.099-11.782.092-12.718.331a2.252 2.252 0 00-1.094.634c-.591.588-.944 1.432-1.085 2.6-.323 2.666-.33 5.886-.019 8.649.134 1.188.41 1.96.928 2.596.323.397.881.734 1.379.835.35.071 2.1.169 4.65.26.38.014 1.385.037 2.235.052 1.77.031 5.025.013 6.886-.039 1.252-.035 3.534-.128 3.961-.161.12-.009.398-.027.618-.039.739-.042 1.209-.196 1.65-.543.571-.449 1.013-1.278 1.2-2.251.177-.92.295-2.559.319-4.42.02-1.555-.007-2.393-.119-3.741zM22.27 4.175l-.828.01-.036 8.83-.718.009c-.555.008-.724-.001-.737-.036-.01-.025-.021-2.016-.026-4.424l-.009-4.379-1.617-.02v-1.38l4.779.019.02 1.36-.828.01zm5.077 5.061v3.797h-1.308v-.4c0-.301-.011-.4-.047-.4-.026 0-.144.099-.263.22-.259.263-.565.474-.827.572-.542.203-1.056.084-1.275-.293-.201-.345-.204-.423-.204-4.005v-3.29h1.307l.01 3.098c.01 3.044.011 3.1.084 3.224.097.164.244.209.478.144.138-.038.232-.105.455-.327l.282-.28V5.437h1.308v3.797zm5.102 3.255c-.115.257-.372.508-.583.57-.549.162-.99.03-1.499-.449-.158-.149-.305-.269-.327-.269-.027 0-.041.116-.041.345v.345h-1.308V2.785h1.308v1.672c0 .919.012 1.672.027 1.672s.153-.122.307-.27c.354-.341.649-.491 1.024-.519.669-.051 1.068.294 1.25 1.08.057.245.062.525.062 2.798 0 2.768 0 2.78-.221 3.273zm5.535-1.52a4.706 4.706 0 01-.077.727c-.182.674-.666 1.152-1.366 1.348-.942.264-1.98-.168-2.394-.997-.232-.465-.241-.558-.241-2.831 0-1.853.007-2.081.066-2.334.168-.715.584-1.178 1.289-1.435.204-.074.417-.113.63-.117.761-.016 1.515.393 1.832 1.059.213.449.24.642.261 1.908l.019 1.136-2.789.019-.01.763c-.015 1.077.058 1.408.349 1.603.244.165.62.152.824-.027.192-.168.246-.349.265-.877l.017-.463h1.347l-.022.518z"
      />
    </svg>
  );
}

export function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" height="20" width="20">
      <path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z" />
    </svg>
  );
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="20" width="20" {...props}>
      <path fill="currentColor" d="M7.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.5 0A4.5 4.5 0 000 4.5v6A4.5 4.5 0 004.5 15h6a4.5 4.5 0 004.5-4.5v-6A4.5 4.5 0 0010.5 0h-6zM4 7.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM11 4h1V3h-1v1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SteeringWheel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      className="text-green-500"
      {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zM8 13l-3.938.001A8.004 8.004 0 0011 19.938V16a3 3 0 01-3-3zm11.938.001L16 13a3 3 0 01-3 3l.001 3.938a8.004 8.004 0 006.937-6.937zM12 4a8.001 8.001 0 00-7.938 7H8a1 1 0 011-1h6a1 1 0 011 1h3.938A8.001 8.001 0 0012 4z" />
    </svg>
  );
}

export function CarSeat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      className="text-green-500"
      {...props}>
      <path d="M12 2a2 2 0 012 2c0 1.11-.89 2-2 2a2 2 0 01-2-2 2 2 0 012-2m.39 12.79a34 34 0 014.25.25c.06-2.72-.18-5.12-.64-6.04-.13-.27-.31-.5-.5-.7l-8.07 6.92c1.36-.22 3.07-.43 4.96-.43M7.46 17c.13 1.74.39 3.5.81 5h2.07c-.29-.88-.5-1.91-.66-3 0 0 2.32-.44 4.64 0-.16 1.09-.37 2.12-.66 3h2.07c.44-1.55.7-3.39.83-5.21a34.58 34.58 0 00-4.17-.25c-1.93 0-3.61.21-4.93.46M12 7S9 7 8 9c-.34.68-.56 2.15-.63 3.96l6.55-5.62C12.93 7 12 7 12 7m6.57-1.33l-1.14-1.33-3.51 3.01c.55.19 1.13.49 1.58.95l3.07-2.63m2.1 10.16c-.09-.03-1.53-.5-4.03-.79-.01.57-.04 1.16-.08 1.75 2.25.28 3.54.71 3.56.71l.55-1.67m-13.3-2.87l-3.94 3.38.89 1.48c.02-.01 1.18-.46 3.14-.82-.11-1.41-.14-2.8-.09-4.04z" />
    </svg>
  );
}

export function FuelPumpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 16"
      height="1.5em"
      width="1.5em"
      className="text-green-500"
      {...props}>
      <path d="M1 2a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 012 2v.5a.5.5 0 001 0V8h-.5a.5.5 0 01-.5-.5V4.375a.5.5 0 01.5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 00-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 010-1c.564 0 1.034.11 1.412.336.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 01-.5.5H15v4.5a1.5 1.5 0 01-3 0V12a1 1 0 00-1-1v4h.5a.5.5 0 010 1H.5a.5.5 0 010-1H1V2zm2.5 0a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5h-5z" />
    </svg>
  );
}

export function CarFrontIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1.5em"
      width="1.5em"
      className="text-green-500"
      {...props}>
      <path
        fillRule="evenodd"
        d="M2.52 3.515A2.5 2.5 0 014.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 01.049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 00.381-.404l.792-1.848zM3 10a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2zM6 8a1 1 0 000 2h4a1 1 0 100-2H6zM2.906 5.189l.956-1.913A.5.5 0 014.309 3h7.382a.5.5 0 01.447.276l.956 1.913a.51.51 0 01-.497.731c-.91-.073-3.35-.17-4.597-.17-1.247 0-3.688.097-4.597.17a.51.51 0 01-.497-.731z"
      />
    </svg>
  );
}
