import md5 from "js-md5";
export function generateId(num: any) {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

export function zipImg(file: any) {
  return new Promise((resolve) => {
    if (file && (file.size / 1024 > 500 || file.type !== "image/gif")) {
      let img = new Image();
      img.src = URL.createObjectURL(file);
      let cvs = document.createElement("canvas");
      let maxRatio = 0.75; // 大图比率
      let minRatio = 0.8; // 小图比率
      let imgQulity = 0.3; // 图像质量
      img.onload = async function () {
        let ratio =
          img.naturalWidth > 1000 || img.naturalHeight > 1000
            ? maxRatio
            : minRatio;
        cvs.width = img.naturalWidth * ratio;
        cvs.height = img.naturalHeight * ratio;
        let ctx: any = cvs.getContext("2d");
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        // 压缩后新图的 base64
        let zipBase64 = cvs.toDataURL(file.type, imgQulity);
        let fileFixed = await dataURLtoFile(zipBase64, file.name, file.type);
        console.log(fileFixed, "fileFixed");
        resolve(fileFixed);
      };
    } else {
      resolve(file);
    }
  });
}

// base64转图片
export function dataURLtoFile(dataurl: any, filename: any, mime: any) {
  return new Promise((resolve) => {
    let arr = dataurl.split(";base64,");
    let suffix = mime.split("/")[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let data = new File([u8arr], `${filename}.${suffix}`, {
      type: mime,
    });
    resolve(data);
  });
}

// 转换mongodbId
// counter: 14213198
// date: 1629351741000
// machineIdentifier: 4162524
// processIdentifier: 25980
// time: 1629351741000
// timeSecond: 1629351741
// timestamp: 1629351741
// => 611def3d3f83dc657cd8e04e
export function convertMongodbId(objectId: any) {
  const { timestamp, machineIdentifier, processIdentifier, counter } = objectId;
  function padZero(str: string, length: number) {
    return str.padStart(length, "0");
  }
  return (
    padZero(timestamp.toString(16), 8) +
    padZero(machineIdentifier.toString(16), 6) +
    padZero(processIdentifier.toString(16), 4) +
    padZero(counter.toString(16), 6)
  );
}

// urlReg /airflow-code/:id/edit   url /airflow-code/123456789/edit
export function matchRoute(urlReg: string, url: string) {
  if (urlReg.split("/").length !== url.split("/").length) {
    return false;
  }
  const pass = [];
  const noPass = [];
  for (let i = 0; i < urlReg.split("/").length; i++) {
    if (
      urlReg.split("/")[i].includes(":") ||
      urlReg.split("/")[i] === url.split("/")[i]
    ) {
      pass.push(i);
    } else {
      noPass.push(i);
    }
  }
  return noPass.length === 0;
}

export function getUrlKey(key: string, href: string) {
  const reg = new RegExp(`[?|&]${key}=([^&;]+?)(&|#|;|$)`).exec(href) || [
    "",
    "",
  ];
  const regUrl = reg[1].replace(/\+/g, "%20");
  return decodeURIComponent(regUrl) || null;
}

//SSOLogin
export async function SSOLogin(ticket: string) {
  // 公司验证接口
  const ssoUrl = `https://cas.ctripcorp.com/caso/serviceValidate?ticket=${ticket}&response_type=JSON&service=${window.location.href}`;
  return fetch(ssoUrl)
    .then((res) => res.json())
    .then((res) => {
      return new Promise((resolve) => {
        const { result }: any = { ...res };
        const ls = localStorage;
        if (!result) return;
        const {
          employee,
          department,
          displayName,
          mail,
          memberOf,
          company,
          name,
        }: any = { ...result };
        ls.setItem("Access-Token", ticket);
        ls.setItem("DisplayName", displayName);
        ls.setItem("Employee", employee);
        resolve(1);
      });
    })
    .catch(() => {
      return new Promise((resolve) => resolve(1));
    });
}

//登出
export const loginOut = async () => {
  localStorage.clear();
  const logoutUrl = `https://cas.ctripcorp.com/caso/logout?service=${window.location.origin}`;
  window.location.assign(logoutUrl);
};

/**
 * 通过员工号来获取头像地址
 * @param emploee API OKR子主题关联需求实体
 * @returns 返回头像地址
 */
export function getUrlByEmployNO(employee: string) {
  return `${import.meta.env.VITE_APP_BASE_Emploee}` + md5(`XXX888_${employee}`);
}
