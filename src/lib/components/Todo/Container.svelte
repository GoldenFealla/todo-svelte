<script lang="ts">
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import type { ItemList, Item, Col } from "$lib/types/todo";

  // Components
  import Column from "./Column.svelte";

  export let itemList: ItemList;
  export let onFinalUpdate: (col: Col, items: Item[]) => void;

  function handleItemFinalize(col: Col, newItems: Item[]) {
    itemList[col] = newItems;
    onFinalUpdate(col, newItems);
  }
</script>

<section class="w-full h-full grid grid-cols-3 grid-template-rows-[1fr] gap-5 px-10">
  {#each Object.entries(itemList) as [column, items], idx (column)}
    <div>
      <Column
        column={column as Col}
        {items}
        onUpdate={(col, newItems) => handleItemFinalize(col, newItems)}
      />
    </div>
  {/each}
</section>
