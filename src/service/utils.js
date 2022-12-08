import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";

export const MY = "my";
export const ADMIN = "admin";
export const USER = "user";
export const SUPER = "super";
export const IMAGE_PLACEHOLDER = "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/62/ca/69bdaf9e44ca9dc4ee2042986f22/cen-2022-holiday-parties-web-lowrcutout._TTW_._CR0,0,2280,1368_._SR1500,900_._QL100_.jpg";
export const CLOUD_NAME = "cs5610-web-final"
export const UPLOAD_PRESET = "dulh2n67";
export const INITIAL_PAGES = [1, 2, 3, 4, 5]
export const PUBLIC_FIELDS = ["username", "firstName", "lastName"];
export const PRIVATE_FIELDS = ["email", "phone", "dateOfBirth"];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDateYYYYMMDD = (date) => {
    return date.split("T")[0];
}
export const getDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
export const resetScrollToTop = () => {
    window.scrollTo(0, 0);
}
export const cloud = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});
export const getAvatar = (profilePhoto) => {
    return cloud.image(profilePhoto).resize(fill(300, 300)).roundCorners(max()).toURL()
}

export const MY_PROFILE_URL = "/profile/my";
export const PROFILE_URL = "/profile";
export const FOOD_DETAIL_URL = "/food/details";

export const goToUserProfile = (navigate, uid) => {
    navigate(`${PROFILE_URL}/${uid}`);
}