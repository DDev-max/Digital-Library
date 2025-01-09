import dynamic from "next/dynamic";

export const DynamicMap = dynamic(() =>
    import("./Map"), {
    ssr: false
}
)