import React from "react";
import Image from "next/image";
import logoImage from "@assets/logos/logo-square.png";
const TermOfService = () => {
  return (
    <div className="flex border-t-1 xl:w-[50%] xl:ms-[20%] max-sm:px-8 sm:px-10 md:px-[10%] lg:px-0 lg:ms-[10%] lg:w-[60%] border-gray-200 w-full flex-col ">
      <div className={"flex w-full"}>
        <div className={"flex md:flex-row max-sm:flex-col sm:flex-col"}>
          <Image
            src={logoImage}
            unoptimized={true}
            alt={"logo"}
            width={112}
            height={112}
            className={"xl:w-48 xl:h-48 md:w-28 md:h-28 w-28 h-28"}
          />
          <h1
            className={
              "flex-col whitespace-nowrap dark:text-white xl:py-20 xl:text-4xl md:py-10 md:text-3xl text-3xl max-sm:py-0 sm:py-0 py-9 text-primary-color"
            }
          >
            K-Quick
            <span
              className={
                "flex-col xl:py-16 xl:text-4xl md:py-10 md:text-3xl text-3xl py-9 text-third-color"
              }
            >
              Sight
            </span>
          </h1>
        </div>
      </div>
      <div className={"flex md:pt-0 max-sm:pt-7 dark:text-white sm:pt-7 flex-col "}>
        <h2 className={"text-text-color dark:text-white md:text-3xl text-2xl"}>
          Term of Service and Privacy Policy
        </h2>
        <h5 className={"text-lg dark:text-white text-text-color md:pt-7 max-sm:pt-3 sm:pt-3"}>
          Introduction
        </h5>
        <p className={"text-description-color dark:text-white pt-3"}>
          Welcome to K-QuickSight, a cutting-edge online service provided free
          of charge at k-quicksight.com. Our platform empowers users to unleash
          the power of data visualization and analysis through versatile
          charts/graphs and machine learning models. K-QuickSight is committed
          to providing an exceptional experience without any associated costs.
        </p>

        <h5 className={"text-lg dark:text-white text-text-color md:pt-7 max-sm:pt-3 sm:pt-3"}>
          Account Types
        </h5>
        <li className={"text-description-color dark:text-white pt-3"}>
          Free Accounts: All-encompassing access to the platform&apos;s features
          without any financial commitment.
        </li>

        <h5 className={"text-lg text-text-color dark:text-white md:pt-7 max-sm:pt-3 sm:pt-3"}>
          Creating an Account
        </h5>
        <p className={"text-description-color dark:text-white pt-3"}>
          To register, you must be at least 18 years old, possessing the
          authority and right to use personal or confidential information in
          your projects. It&apos;s your responsibility to ensure eligibility
          before registering. By registering, you confirm meeting these minimum
          criteria.
        </p>
        <p className={"text-description-color dark:text-white pt-3"}>
          Provide an accurate, updated email address for registration. You are
          accountable for the information provided and must promptly update
          account details for any changes.
        </p>
        <p className={"text-description-color dark:text-white pt-3"}>
          Approval for registration is at our discretion, and we reserve the
          right to decline applications without providing a reason. Upon
          approval, you will receive a notification from us.
        </p>

        <h5 className={"text-lg text-text-color dark:text-white md:pt-7 max-sm:pt-3 sm:pt-3"}>
          Username and password
        </h5>
        <p className={"text-description-color dark:text-white pt-3"}>
          Upon registering for an account, you will be required to create a
          username and password. Safeguard your password confidentially and
          exclusively utilize it for accessing and managing your account,
          refraining from any other purpose. You are the sole authorized user of
          your account, and therefore, you must not disclose your password to
          others. If you detect any unauthorized account use or encounter issues
          with your username/password, promptly notify us (see Contacting us).
          Any violation of these terms or use of your account by someone with
          your password will be considered as if you committed the breach, and
          you remain obligated to us.
        </p>

        <h5 className={"text-lg text-text-color dark:text-white md:pt-7 max-sm:pt-3 sm:pt-3"}>
          Our Service
        </h5>
        <p className={"text-text-color text-[17px] dark:text-white font-medium pt-4"}>
          Creating and Managing Data Insights
        </p>
        <p className={"text-description-color dark:text-white pt-3"}>
          To harness the capabilities of K-Quicksight, users can delve into a
          myriad of features tailored for data analysis, visualization in
          dashboards, exploratory data analysis (EDA), data cleansing, and
          recommendation. To get started, simply register and set up your
          K-Quicksight account, granting you access to a suite of powerful tools
          designed to elevate your data-related endeavors.
        </p>
        <p className={"text-text-color dark:text-white text-[17px] font-medium pt-4"}>
          Analysis and Visualization
        </p>
        <p className={"text-description-color dark:text-white  pt-3"}>
          To harness the capabilities of K-Quicksight, users can delve into a
          myriad of features tailored for data analysis, visualization in
          dashboards, exploratory data analysis (EDA), data cleansing, and
          recommendation. To get started, simply register and set up your
          K-Quicksight account, granting you access to a suite of powerful tools
          designed to elevate your data-related endeavors.
        </p>
        <p className={"text-text-color dark:text-white text-[17px] font-medium pt-4"}>
          Unacceptable content
        </p>
        <p className={"text-description-color dark:text-white pt-4"}>
          By importing a dashboard or creating a dashboard on the Site, you
          confirm that your dashboards or projects do not contain, transmit,
          distribute, link to, or otherwise make available, or advertise or
          promote any unacceptable content. Unacceptable content includes (but
          is not limited to) content that:
          <span className="leading-loose">
            <li>
              infringes any intellectual property rights or data protection,
              privacy, or other rights of any other person;
            </li>
            <li>
              is defamatory or in breach of any contractual duty or any
              obligation of confidence; is obscene, sexually explicit,
              threatening, abusive, harassing, inciteful of violence or hatred,
              blasphemous, discriminatory (on any ground);
            </li>
            <li>is liable to cause anxiety, alarm, or embarrassment;</li>
            <li>is knowingly false or misleading;</li>
            <li>
              is, or could reasonably be seen as, spam or another form of
              unsolicited marketing;
            </li>
            <li>
              does not comply with any applicable laws and regulations or is
              otherwise objectionable.
            </li>
          </span>
        </p>

        <h5 className={"text-lg text-text-color dark:text-white md:pt-7 max-sm:pt-3 sm:pt-3"}>
          Intellectual Property
        </h5>
        <p className={"text-description-color dark:text-white pt-3"}>
          Any intellectual property you upload to the K-quicksight Site, such as
          data, text, or dashboard you create, remains your property. You agree
          to protect K-quicksight and its affiliates from any losses, damages,
          or expenses (including legal fees) that may arise if a third party
          claims that any content you upload to the Site infringes on their
          intellectual property rights or other rights. This includes any fonts
          or other materials you provide to us for uploading.
        </p>
        <p className={"text-description-color dark:text-white pt-3"}>
          All intellectual property rights in the Site itself, including text,
          graphics, software, images, videos, sounds, trademarks, and logos, are
          owned by K-quicksight or its licensors. We also own the intellectual
          property rights to all dashboards we create, except for those
          specifically commissioned and created for private customers, which are
          subject to separate intellectual property agreements.
        </p>
        <h5 className={"text-lg text-text-color dark:text-white md:pt-7 max-sm:pt-3 sm:pt-3"}>
          License to Use K-quicksight
        </h5>
        <p className={"text-description-color dark:text-white pt-3"}>
          We grant you a non-exclusive, non-transferable worldwide license to
          use the Site and its contents (including any dashboards we create and
          make available to you) for the duration of your subscription or, for
          free users, as long as you have an active K-quicksight account. You
          also have an irrevocable, non-exclusive license to publish downloaded
          projects in their original form, even if your K-quicksight account is
          no longer active.
        </p>
      </div>
    </div>
  );
};

export default TermOfService;
