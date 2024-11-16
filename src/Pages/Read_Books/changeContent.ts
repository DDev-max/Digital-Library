import { URLorem } from "../../data/consts"
import { ChangeContentProps } from "../../data/types"



export function changeContent({newData,queryClient}:ChangeContentProps) {       

    queryClient.setQueryData(["LoremIpsum", URLorem], newData)

}