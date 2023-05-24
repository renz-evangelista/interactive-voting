import create from "zustand"
import { persist } from "zustand/middleware"

type Nominee = {
    categoryId: string,
    nomineeId: number,
    name: string,
}

type Store = {
    selectedNominees: Nominee[],
    votedNominees: Nominee[],
    addSelectedNominees: (categoryId:string, nomineeId: number, name: string) => void,
    addVotedNominees: (votedNominees: Nominee[]) => void,
}

export const useStore = create<Store>()(
        persist(
            (set) => ({
            selectedNominees: [],
            votedNominees: [],
            addSelectedNominees(categoryId: string, nomineeId: number, name: string) {
                set((state) => {
                    const newSelectedNominees: Nominee[] = state.selectedNominees.map(nominee => {
                        if (nominee.categoryId === categoryId) {
                            return ({categoryId, nomineeId, name
                        })} else {
                            return nominee
                        }})
                    
                    if(!newSelectedNominees.some(nominee => nominee.categoryId === categoryId)) {
                        newSelectedNominees.push({categoryId, nomineeId, name})
                    }
                    
                    return ({
                    ...state,
                    selectedNominees: newSelectedNominees
                })
                })
            },
            addVotedNominees(votedNominees: Nominee[]) {
                set((state) => ({
                    ...state,
                    votedNominees
                }))
            }
        }),
        {
            name: 'voting-list',
            getStorage: () => localStorage
        }
    )
)

export default useStore;