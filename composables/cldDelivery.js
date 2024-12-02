export default function (url, transformation) {
    // Get Cloudinary enviroment url
    const rtc = useRuntimeConfig();
    const cEnv = rtc.public.cloudinaryEnvUrl;
    // Set a base url for relative url
    const cldBaseUrl = cEnv + '/image/upload';
    // construct new url if url = absolute
    const absoluteUrl = url.replace(cldBaseUrl, cldBaseUrl + '/' + transformation) ;
    // construct new url if url = relative
    const relativeUrl = cldBaseUrl + '/' + transformation + url;
    const newUrl = url.includes(cEnv) ? absoluteUrl : relativeUrl;
    return newUrl
}