import img1 from "@/image/About-us.jpg";
import img2 from "@/image/me.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-2 space-y-10 md:mx-10 md:my-28">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold text-primary-100">About Mibagu</h1>
        <p>
          Mibagu is dedicated to empowering youth through enterprise, serving as
          a vital pool for future prosperity and employment creation. We believe
          that fostering entrepreneurial skills among young people is crucial
          for economic development and sustainable growth.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <Image
            alt="About Us"
            src={img1}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-primary-100 md:text-3xl">
            Our Mission
          </h2>
          <p className="text-sm md:text-base">
            At Mibagu, our mission is to cultivate a thriving environment where
            youth can develop their entrepreneurial ideas and gain access to
            resources. We complement existing bank programs that support young
            entrepreneurs by providing training, mentorship, and funding
            opportunities.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-primary-100 md:text-3xl">
            Our Vision
          </h2>
          <p className="text-sm md:text-base">
            Our vision is to see a generation of empowered young leaders who
            drive innovation and create job opportunities. By investing in youth
            enterprise, we contribute to a robust economy that benefits
            everyone.
          </p>
        </div>
        <div>
          <Image
            src={img2}
            alt="Profile Picture"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </section>
    </div>
  );
}
