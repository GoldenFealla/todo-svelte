<script lang="ts">
  import { onMount } from "svelte";
  import { ModeWatcher } from "mode-watcher";

  import { BOARD } from "$lib/types/todo";
  import type { Item, ItemList } from "$lib/types/todo";

  // Components
  import ModeSwitch from "$lib/components/ModeSwitch/ModeSwitch.svelte";
  import Container from "$lib/components/Todo/Container.svelte";
  import CreateTodo from "$lib/components/Dialog/CreateTodo.svelte";

  let itemList: ItemList = {
    TODO: [],
    "IN PROGRESS": [],
    DONE: [],
  };

  function handleBoardUpdated(column: string, items: Item[]) {
    const data = JSON.stringify(items);
    localStorage.setItem(column, data);
  }

  function onCreate(item: Item) {
    console.log(item);
    itemList.TODO = [...itemList.TODO, item];
    const data = JSON.stringify(itemList.TODO);
    localStorage.setItem("TODO", data);
  }

  onMount(async () => {
    for (let i = 0; i < BOARD.length; i++) {
      const column = BOARD[i];
      const localData = localStorage.getItem(column);
      if (localData != null) {
        const data = JSON.parse(localData);
        itemList[column] = data;
      }
    }
  });
</script>

<ModeWatcher />
<slot />

<div class="w-full h-full flex flex-col">
  <div class="w-full flex flex-row items-center justify-end p-2">
    <span class="mr-2">
      <CreateTodo
        onCreate={(item: Item) => {
          onCreate(item);
        }}
      />
    </span>
    <span>
      <ModeSwitch />
    </span>
  </div>
  <div class="grow">
    <Container {itemList} onFinalUpdate={handleBoardUpdated} />
  </div>
</div>
