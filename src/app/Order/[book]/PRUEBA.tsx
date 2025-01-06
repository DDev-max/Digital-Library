import dynamic from "next/dynamic";

export const DynamicMap = dynamic(() =>
    import("../../../components/Map/Map"), {
    ssr: false
}
)