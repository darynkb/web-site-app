"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsComponent() {
  return (
    <Tabs defaultValue="about" className="w-full max-w-3xl">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
        <TabsTrigger value="about" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">About</TabsTrigger>
        <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Projects</TabsTrigger>
        <TabsTrigger value="publications" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Publications</TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="mt-4">
        <p>I&apos;m a robotics engineer specializing in tactile sensing and shape recognition.</p>
      </TabsContent>
      <TabsContent value="projects" className="mt-4">
        <p>Here you can list your robotics projects and research work.</p>
      </TabsContent>
      <TabsContent value="publications" className="mt-4">
        <p>Your academic publications and research papers can be listed here.</p>
      </TabsContent>
    </Tabs>
  )
}