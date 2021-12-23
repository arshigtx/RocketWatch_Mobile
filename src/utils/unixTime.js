export function formatUnix(unix){
  let unixStr = unix.toString();
  let newUnixStr = unixStr.slice(0, -3);
  let newUnixNum = parseInt(newUnixStr);
  return newUnixNum
}
