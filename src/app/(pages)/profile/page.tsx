"use client";
import formatDate from "@/components/helper/hook/FormattedDate";
import Loading from "@/components/helper/Loading";
import ToolTipHookDown from "@/components/helper/ToolTipHookDown";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    image: null,
    status: "",
    createdAt: "",
    bio: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    github: "",
    _count: { posts: "", comments: "" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-28 flex flex-col items-center justify-center gap-20">
          <Card className="flex w-11/12 flex-col md:flex-row lg:w-10/12">
            <div className="md:w-4/12">
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt=""
                  className="h-52 w-full rounded-lg object-cover md:h-40 lg:h-80"
                  height={200}
                  width={200}
                />
              ) : (
                <div className="flex h-52 w-full items-center justify-center border text-2xl text-muted-foreground">
                  No Image Found
                </div>
              )}
            </div>
            <div className="md:w-8/12">
              <CardHeader>
                <div className="flex items-center gap-8">
                  <CardTitle className="text-2xl font-extrabold">
                    {userData.name}
                  </CardTitle>
                  <Badge>{userData.status}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div>
                  <div className="flex items-center gap-4">
                    <span>Member Since:</span>
                    <span>{formatDate(userData.createdAt)}</span>
                  </div>
                </div>
                <div
                  className="mt-3 text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: userData.bio }}
                />
              </CardContent>
              <CardFooter className="flex flex-wrap">
                {(userData.facebook ||
                  userData.twitter ||
                  userData.linkedin ||
                  userData.instagram ||
                  userData.github) && <div>Connect with me:</div>}
                <div className="flex flex-wrap gap-4 pl-4 text-muted-foreground hover:[&>*]:text-foreground">
                  {userData.facebook && (
                    <Link
                      href={`https://${userData.facebook}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <ToolTipHookDown
                        text="Facebook"
                        icon={<FaFacebook size={20} />}
                      />
                    </Link>
                  )}
                  {userData.twitter && (
                    <Link
                      href={`https://${userData.twitter}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <ToolTipHookDown
                        text="Twitter"
                        icon={<FaTwitter size={20} />}
                      />
                    </Link>
                  )}
                  {userData.linkedin && (
                    <Link
                      href={`https://${userData.linkedin}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <ToolTipHookDown
                        text="LinkedIn"
                        icon={<FaLinkedin size={20} />}
                      />
                    </Link>
                  )}
                  {userData.instagram && (
                    <Link
                      href={`https://${userData.instagram}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <ToolTipHookDown
                        text="Instagram"
                        icon={<FaInstagram size={20} />}
                      />
                    </Link>
                  )}
                  {userData.github && (
                    <Link
                      href={`https://${userData.github}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <ToolTipHookDown
                        text="GitHub"
                        icon={<FaGithub size={20} />}
                      />
                    </Link>
                  )}
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
