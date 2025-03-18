import * as React from "react"

import { cn } from "@/lib/utils"

import { Link } from "react-router-dom";
import serviceObj from "@/appwrite/config";



function Card({
  $id,
  className,
  ...props
}) {
  return (
     $id ? (
      <Link
        to={`/post/${$id}`}
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
          className
        )}
        {...props}
      />
    ) : (
      <div 
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ",
          className
        )}
        {...props}
      />
    )
   
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props} />)
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props} />)
  );
}

function CardImage({
  className,
  featuredImage="",
  ...props
}) {
  return (
    (<img
      src={serviceObj.getFilePreview(featuredImage)}
      alt="Image Here"
      data-slot="card-image"
      className={cn("", className)}
      {...props} />)
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />)
  );
}

function CardContent({
  className,
  ...props
}) {
  return (<div data-slot="card-content" className={cn("px-6", className)} {...props} />);
}

function CardFooter({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props} />)
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardImage, CardDescription, CardContent }
