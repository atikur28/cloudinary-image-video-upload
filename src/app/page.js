import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { CloudUpload, Lock, Visibility, Person } from "@mui/icons-material";
import banner_image from "@/assets/banner-image.png";
import ScrollButton from "@/components/ScrollButton/ScrollButton";
import ImageUploadUI from "@/components/ImageUploadUI/ImageUploadUI";
import VideoUploadUI from "@/components/VideoUploadUI/VideoUploadUI";

const VIDEO_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/video/upload`;
const UPLOAD_PRESET = process.env.PRESET;
const UPLOAD_FOLDER = process.env.FOLDER;

const IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET2 = process.env.PRESET2;
const UPLOAD_FOLDER2 = process.env.FOLDER2;

export default function Home() {
  return (
    <main className="bg-gray-50 md:p-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How it Works */}
      <HowItWorksSection />

      {/* Upload Section */}
      <UploadSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

const HeroSection = () => (
  <Box
    className="relative w-full h-[500px] bg-cover bg-center"
    style={{ backgroundImage: `url(${banner_image.src})` }}
  >
    <Box className="absolute inset-0 bg-black opacity-50"></Box>
    <Box className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h2 className="text-3xl md:text-5xl font-semibold">
        Manage Your Files Effortlessly
      </h2>
      <p className="max-w-xl mt-4 mb-6">
        Easily upload, manage, and preview your images and videos with just a few clicks. Perfect for professionals and creatives.
      </p>
      <ScrollButton />
    </Box>
  </Box>
);

const FeaturesSection = () => (
  <Box className="py-16 bg-white">
    <h3 className="text-2xl md:text-5xl font-semibold text-center text-black mb-8">
      Why Choose Us
    </h3>
    <Grid container spacing={4} justifyContent="center">
      {[
        { title: "Fast Uploads", description: "Experience lightning-fast upload speeds for both images and videos.", icon: <CloudUpload style={{ fontSize: 100 }} /> },
        { title: "Secure Storage", description: "Your files are stored securely with cloud backup and encryption.", icon: <Lock style={{ fontSize: 100 }} /> },
        { title: "Live Previews", description: "Get instant live previews for your images and videos after upload.", icon: <Visibility style={{ fontSize: 100 }} /> },
        { title: "User Friendly", description: "A simple and intuitive interface makes file management a breeze.", icon: <Person style={{ fontSize: 100 }} /> }
      ].map((feature, index) => (
        <Grid item xs={12} md={3} key={index} className="mx-2 md:mx-0">
          <Card className="text-center p-4">
            <Box className="flex justify-center">
              {feature.icon}
            </Box>
            <CardContent>
              <h4 className="text-lg md:text-xl font-semibold">
                {feature.title}
              </h4>
              <p className="text-gray-600 font-medium mt-2">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const HowItWorksSection = () => (
  <Box className="py-16 bg-gray-100">
    <h3 className="text-2xl md:text-5xl font-semibold text-center text-black mb-8">
      How It Works
    </h3>
    <Grid container spacing={4} justifyContent="center">
      {[
        { step: "Upload", description: "Upload your image or video files." },
        { step: "Preview", description: "Get an instant live preview link." },
        { step: "Share", description: "Easily share your files with others." }
      ].map((item, index) => (
        <Grid item xs={12} md={4} key={index} className="mx-2 md:mx-0">
          <Card className="text-center p-4">
            <h4 className="text-lg md:text-xl font-semibold">
              Step {index + 1}: {item.step}
            </h4>
            <p className="font-semibold text-gray-600 mt-2">
              {item.description}
            </p>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const UploadSection = () => (
  <Box className="my-12 p-4" id="upload-section">
    <h4 className="text-2xl md:text-5xl font-semibold text-center text-black mb-8">
      Start Uploading Your Files
    </h4>
    <Box
      className="flex flex-col md:flex-row justify-center xl:w-max xl:mx-auto"
      sx={{ gap: { xs: 2, sm: 4, md: 2 } }}
    >
      <Box
        className="flex justify-center w-full md:w-1/2"
        sx={{ mb: { xs: 2, md: 0 } }}
      >
        <ImageUploadUI UPLOAD_URL={IMAGE_UPLOAD_URL} UPLOAD_PRESET={UPLOAD_PRESET2} UPLOAD_FOLDER={UPLOAD_FOLDER2} />
      </Box>
      <Box
        className="flex justify-center w-full md:w-1/2"
      >
        <VideoUploadUI UPLOAD_URL={VIDEO_UPLOAD_URL} UPLOAD_PRESET={UPLOAD_PRESET} UPLOAD_FOLDER={UPLOAD_FOLDER} />
      </Box>
    </Box>
  </Box>
);

const Footer = () => (
  <Box className="py-8 bg-gray-800 text-white">
    <p className="font-semibold text-center">
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </p>
  </Box>
);
