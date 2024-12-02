export default function (url, transformation, video) {
    // Get Cloudinary enviroment url
    const rtc = useRuntimeConfig();
    const cEnv = rtc.public.cloudinaryEnvUrl;
    // Set a base url for relative url


    // TODO: create video fallback 



    const cldBaseUrl = cEnv + (video == 'video' ? '/video/upload' : '/image/upload');
    // construct new url if url = absolute
    const absoluteUrl = url.replace(cldBaseUrl, cldBaseUrl + '/' + transformation) ;
    // construct new url if url = relative (and check for video content)
    const relativeUrl = cldBaseUrl + '/' + transformation + url;
    const newUrl = url.includes(cEnv) ? absoluteUrl : relativeUrl;
    return newUrl
}