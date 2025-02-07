import{ Button } from "@heroui/Button"

type FilterButtonsProps = {
  filter: "all" | "active" | "completed"
  setFilter: (filter: "all" | "active" | "completed") => void
}

export default function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <Button
        variant={filter === "all" ? "solid" : "bordered"}
        onPress={() => setFilter("all")}
        className="px-4 py-2 rounded-md transition-colors duration-300"
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "solid" : "bordered"}
        onPress={() => setFilter("active")}
        className="px-4 py-2 rounded-md transition-colors duration-300"
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "solid" : "bordered"}
        onPress={() => setFilter("completed")}
        className="px-4 py-2 rounded-md transition-colors duration-300"
      >
        Completed
      </Button>
    </div>
  )
}

