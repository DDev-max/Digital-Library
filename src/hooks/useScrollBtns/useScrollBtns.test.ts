import { fireEvent, renderHook } from "@testing-library/react"
import { useScrollBtns } from "./useScrollBtns"


const sliderRef = { current: document.createElement("div") }

Object.defineProperty(sliderRef.current, 'scrollWidth', {
    value: 500,
});

Object.defineProperty(sliderRef.current, 'clientWidth', {
    value: 200,
});


it("souldnt change initial state if theres no slider", () => {
    const { result } = renderHook(useScrollBtns, { initialProps: null })

    expect(result.current).toEqual([false, true])
})

describe("visible buttons", () => {

    test("first button should be visible if scroll is not at the start", () => {
        sliderRef.current.scrollLeft = 100;


        const { result } = renderHook(useScrollBtns, { initialProps: sliderRef })

        fireEvent.scroll(sliderRef.current)


        expect(result.current).toEqual([true, expect.any(Boolean)])
    })


    test("second button should be visible if scroll is at the start", () => {
        sliderRef.current.scrollLeft = 0;


        const { result } = renderHook(useScrollBtns, { initialProps: sliderRef })

        fireEvent.scroll(sliderRef.current)


        expect(result.current).toEqual([expect.any(Boolean), true])
    })

    test("both buttons should be visible if there is scroll on both sides", () => {
        sliderRef.current.scrollLeft = 250;


        const { result } = renderHook(useScrollBtns, { initialProps: sliderRef })

        fireEvent.scroll(sliderRef.current)


        expect(result.current).toEqual([true, true])
    })
})


describe("hidden buttons" ,()=>{

    test("first button should be hidden if there is no scrolling to the left", ()=>{
        sliderRef.current.scrollLeft = 0;

        const { result } = renderHook(useScrollBtns, { initialProps: sliderRef })

        fireEvent.scroll(sliderRef.current)

        expect(result.current).toEqual([false, expect.any(Boolean)])
    })

    test("second button should be hidden if there is no scrolling to the right", ()=>{
        sliderRef.current.scrollLeft = sliderRef.current.scrollWidth;

        const { result } = renderHook(useScrollBtns, { initialProps: sliderRef })

        fireEvent.scroll(sliderRef.current)

        expect(result.current).toEqual([expect.any(Boolean), false])
    })
})
