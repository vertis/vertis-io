interface ImageTransformOptions {
    width?: number;
    height?: number;
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
    quality?: number;
}

export function getCloudflareImageUrl(imageId: string, options: ImageTransformOptions = {}): string {
    const baseUrl = 'https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg';
    
    // Build the transformation string
    const transforms: string[] = [];
    if (options.width) transforms.push(`w=${options.width}`);
    if (options.height) transforms.push(`h=${options.height}`);
    if (options.fit) transforms.push(options.fit);
    if (options.quality) transforms.push(`q=${options.quality}`);
    
    const transformString = transforms.length > 0 ? `/${transforms.join(',')}` : '';
    
    return `${baseUrl}/${imageId}${transformString}`;
}

// Common image sizes for responsive images
export function getResponsiveImageSrcSet(imageId: string): string {
    const sizes = [320, 640, 768, 1024, 1280, 1536];
    
    return sizes
        .map(size => {
            const url = getCloudflareImageUrl(imageId, { width: size });
            return `${url} ${size}w`;
        })
        .join(', ');
}

// Helper for feature images
export function getFeatureImage(imageId: string) {
    return {
        url: getCloudflareImageUrl(imageId, { width: 1280, quality: 80 }),
        preview_url: getCloudflareImageUrl(imageId, { width: 640, quality: 60 })
    };
}

// Map of old image paths to Cloudflare image IDs
export const imageIdMap: Record<string, string> = {
    // Core site images
    '/assets/img/authorimage.jpg': '4f506bd6-ac0b-4fb6-a1ca-07a051ccd300',
    '/assets/img/bloglogo.jpg': '5ac83ee7-fd5d-4acc-b35c-3f2820256d00',
    '/assets/img/city-laptop.jpg': '0e230c27-d49c-4942-33fb-f06aa5e72e00',
    
    // Blog post images
    '/assets/img/csiro-hexapod.png': '04e9d3a5-1186-4314-b712-ce0d3a3d3600',
    '/assets/img/impractical-desks.jpg': '6e0103c6-e94b-4aa5-2714-9f4b60536e00',
    '/assets/img/doom-zombies.jpg': '1d006da8-0186-4248-c58e-55bc8abfb800',
    '/assets/img/aframe-sample-screenshot.png': '03d82851-b6bf-4699-672d-e6755ab28c00',
    '/assets/img/3d-placeholder-2.jpg': '2027c562-ef94-42f8-ab96-7a1d4759ed00',
    '/assets/img/reprap-prusa-i3.png': 'af8918f4-1213-41a7-a8ee-b8951bbb4700',
    '/assets/img/oculus-connect-gearvr.png': 'a80f675f-4dbf-4300-4206-78897a0c9100',
    '/assets/img/vive-devkit-1.jpg': '0f613192-5bb0-439d-162e-b29b88216800',
    '/assets/img/vive-devkit-1.png': 'fb91d677-6649-48ef-9d7a-ddfc53f3a700',
    '/assets/img/spaces-offer.png': 'bc299e9e-ae0c-46b9-cfd2-d56d06fddf00',
    '/assets/img/vive-devkit-3.png': 'c193f0f2-d532-405e-0a0b-daacdcee6f00',
    '/assets/img/joh-leap-motion.png': '29601314-a975-4eb7-610a-0974b028a500',
    '/assets/img/ready-player-one.jpg': '89de0db5-ef51-4966-e5f6-839f32a0a700',
    '/assets/img/vive-devkit-2.png': 'a245b936-f021-4bee-10af-b81b03dc1700',
    '/assets/img/hn-thread-for-litecoin-mining-blog-post.png': 'e57fe6f2-5df3-46fc-afc9-2b56bdf5ee00',
    '/assets/img/unable-to-verify-startup-disk.jpg': 'a237985e-6cb6-4d2d-a9c4-809351f21300',
    '/assets/img/vive-devkits.png': '0f77efb6-47e5-4a79-362c-30936cb24200',
    '/assets/img/future-assembly.jpg': '90840290-4a87-4ff5-5db8-6f4bf8ec2e00',
    '/assets/img/property-look_720.png': 'b5457a9f-8e12-4e10-0949-1dcf05c96300',
    '/assets/img/house-professional-photo.png': '55121cb0-7fa5-4008-db6d-369799ba0900',
    '/assets/img/rob-recon-glasses.png': '1d7bbcad-b012-4017-c3ba-5382669cf600',
    '/assets/img/oculus-connect-3.png': 'a47d460d-006a-496d-35aa-04b68becf200',
    '/assets/img/spaces-opera-garnier.jpg': 'b9702e62-7ba8-4661-cc87-d6f79cfd2e00',
    '/assets/img/architecture-sxsw.png': '39c4c3fa-d670-4bc7-f632-56ace9736a00',
    '/assets/img/csiro-quadcopter.png': 'fab76d15-ae01-4413-3d35-4f6c642b6600',
    '/assets/img/oculus-connect-2.png': '75058ed7-f36b-4a25-454c-8688138c4000',
    '/assets/img/newsfoundry.png': '77be0f19-71be-4996-688e-f50af1507300',
    '/assets/img/mergevr.png': 'c2059044-0210-477e-e8be-bdd8cfd60300',
    '/assets/img/healthcare-in-estonia.jpg': 'ca64a949-4754-4ac0-0ce3-ef24963a5e00',
    '/assets/img/oculus-connect-1.png': '8a0f0b44-d029-45c5-c9c5-8430fc13af00',
    '/assets/img/rea-first-3d-room-scans-4.jpeg': 'dbff45bd-66eb-4862-e4b9-960bf5fb1c00',
    '/assets/img/newsbrowse2.png': '9f6147c0-0e5a-4701-eab2-f9de15f0a000',
    '/assets/img/newsbrowse2a.png': 'eb04cd4f-9e6b-4e71-083b-6de05e4c4400',
    '/assets/img/cryptopunks.png': '8ad123f2-faaa-4824-2507-5339937cd400',
    '/assets/img/searchbox_720.png': '81a18649-1d96-4ef3-1936-090c556a6e00',
    '/assets/img/newsbrowse1.png': '6ce26287-be50-426e-d296-956a7bbfe200',
    '/assets/img/didtheyreadit-20050831.png': 'dc52310a-1726-4cd6-f1c1-41440bdf7e00',
    '/assets/img/braille.png': 'ee06a540-7bc9-4efd-b5b7-11d3c8799800',
    '/assets/img/kmart-vr.png': '93b82f84-6117-4819-f15f-410199760e00',
    '/assets/img/autodesk-gallery.png': '9972cee1-bd5b-4d4a-7712-f11bffebf400',
    '/assets/img/regina-dugan-making-epic-shit.jpg': '2d338eb2-4a8c-447c-c733-782127bdd800',
    '/assets/img/spaces-reaumur.jpg': '848a54be-7515-42b0-f258-7cd40694da00',
    '/assets/img/realestate_vr.png': 'c2eb994c-a9e9-4dc5-3533-0767ab824600',
    '/assets/img/cafe-laptop.jpg': '1d8d8857-7622-4964-bd51-552443251c00',
    '/assets/img/google-search-link-facebook.png': 'edf2f388-e215-48c4-fb5d-d393e40b6800',
    '/assets/img/vr-at-officeworks.png': '13fc8dc5-389c-44f1-d219-65f271cad800',
    '/assets/img/rhok-melb-fgis.jpg': 'a33930b7-4158-4847-9e39-0d4caadf5f00',
    '/assets/img/rhok-team.jpg': '5d38cdab-89be-4ab1-d3eb-5f646e2fa400',
    '/assets/img/spaces-no-milk.jpg': 'a4f4be61-04ea-4867-1070-c6d67b484300',
    '/assets/img/luke-chadwick-budapest.jpg': 'cea5c06f-f851-4ed1-ece3-0260e73ae000',
    '/assets/img/newsfoundry-hotel.png': '7974ffc1-8c81-4cd6-67ea-7a180150b500',
    '/assets/img/oculus-connect-crowd.jpg': 'f9ff4d0f-3745-401e-7a3a-a10a73e33000',
    '/assets/img/fgis-early-mockup.jpg': '502af3d5-9a68-45ff-c2a5-be6f59440f00',
    '/assets/img/arec-zerolatency.png': 'a4ec1496-e512-4be9-aa4c-b41027cac600',
    '/assets/img/obsidian-image-layouts-layout-g.png': '8f47266b-b65a-4d8c-7fbb-984d1187b300',
    '/assets/img/ray-white-matterport.png': '143f929b-3394-4423-578d-ab63bc81ec00',
    '/assets/img/autodesk-gallery-2.png': '8e8416c0-3987-45a3-0585-c9afcd1f5600',
    '/assets/img/minus-one-week.jpg': 'a1529af9-b4ee-4087-1eed-51b3fdf60e00',
    '/assets/img/oculus-connect-proto-awards.png': '2b82c283-560a-491e-4f19-4790a5f4a700',
    '/assets/img/matterport-2016-02-01.jpg': '2a7ba85e-fbf4-4ec5-05d3-7dad520e6a00',
    '/assets/img/islands-in-the-net.jpg': '9be08f2e-aeaf-49c3-8799-f09c45d99900',
    '/assets/img/spaces-review-response.png': 'b3c62570-6486-49b5-6435-7e56afcf3100',
    '/assets/img/darknet.png': 'caeb647f-17cd-40b8-d615-9f01e15b4900',
    '/assets/img/faxitforme.png': '3db9b460-9406-48a6-a926-f8f244ff6b00',
    '/assets/img/biennale-1.png': 'a9ccc115-eb65-4648-8150-a9200faac800',
    '/assets/img/aws-billing-dashboard.png': 'd7655060-12e0-4176-b230-c91f83d2ea00',
    '/assets/img/laundromat-paris.jpg': '0ad243b4-9a1d-4433-528a-226543c79300',
    '/assets/img/fire-geo-information-mockup.jpg': '3a8d0259-1345-449c-5134-314b776f4f00',
    '/assets/img/macbook-lid.jpg': '2ce02493-3a2d-4dd7-4f0c-7d94e5179b00',
    '/assets/img/bandh-photo.png': '62e16178-22ae-4e3e-a778-95b3f827c200',
    
    // Stock photos and unsplash images
    '/assets/img/mohammed-fkriy-ySHZlKZkZMk-unsplash.jpg': '3eef8c4b-63f2-405c-0376-364826346000',
    '/assets/img/markus-spiske-qjnAnF0jIGk-unsplash.jpg': 'c19f608c-0ed4-4c8a-9217-163604773b00',
    '/assets/img/nastya-dulhiier-OKOOGO578eo-unsplash.jpg': '814deac4-3126-40ea-f259-90c15bca3900',
    '/assets/img/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg': '289cb4b2-3225-4142-6187-375f89e4aa00',
    '/assets/img/luis-cortes-28jE7Ul1L8I-unsplash.jpg': 'fb568bf5-9cbe-435a-74af-bb6fd1344000',
    '/assets/img/max-chen-lud4OaUCP4Q-unsplash.jpg': '22d2d979-e53f-41a9-267a-bea36fbfd100',
    '/assets/img/brett-jordan-LPZy4da9aRo-unsplash.jpg': '27856a0a-b04d-43e7-30a3-31d00d236700',
    '/assets/img/tim-gouw-1K9T5YiZ2WU-unsplash.jpg': '60615a3c-c253-403e-cc95-b1a5cc3b0200',
    '/assets/img/h-heyerlein-ndja2LJ4IcM-unsplash.jpg': 'c44137e1-fcca-465b-dffb-01b97e86fd00',
    '/assets/img/jaime-dantas-HMRXByTzfH8-unsplash.jpg': '796fa51c-4220-487a-0cb4-f843ba849e00',
    '/assets/img/yannick-pipke-GtcA8mw0t1U-unsplash.jpg': '383b6f1a-6264-4369-511b-3b437563bd00',
    '/assets/img/alex-kotliarskyi-ourQHRTE2IM-unsplash.jpg': '02a3b630-76d0-4343-5692-c526c8476800',
    '/assets/img/jason-briscoe-amLfrL8LGls-unsplash.jpg': 'bd8139c3-21b8-49b1-7d5a-df3a60096c00'
};
