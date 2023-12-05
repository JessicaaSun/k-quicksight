'use client'
import React, {useState} from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import LoginQuick from "@/app/auth/login/components/Form";
import SignUpForm from "@/app/auth/signup/components/Form";

export default function Authentication() {
  const [selected, setSelected] = useState("login");

  return (
      <div className="flex flex-col w-full justify-center items-center min-h-screen p-3">
        <Card className="lg:w-1/3 md:w-2/3 w-full transition-all">
          <CardBody className={'transition-all'}>
            <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login">
                <LoginQuick />
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <SignUpForm />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
  );
}
