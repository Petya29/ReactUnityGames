import { ActionButton } from "../components/ui/inputs";

export const Home = () => {

    const handleclick = () => {
        console.log('click')
    }

    return (
        <div className="w-3/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center text-white">
            <h1 className="font-semibold text-7xl">Game on!</h1>
            <div className="my-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas animi quas magni rerum nobis
                rem earum dignissimos voluptates quia quasi, molestiae beatae ipsa consequuntur explicabo
                similique eaque recusandae commodi natus?
            </div>
            <div>
                <ActionButton onClick={handleclick}>
                    Go game
                </ActionButton>
            </div>
        </div>
    )
}
