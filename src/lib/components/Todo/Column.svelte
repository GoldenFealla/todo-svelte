<script lang="ts">
  import { flip } from "svelte/animate";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { type Col, type Item } from "$lib/types/todo";

  // Components
  import ItemCard from "./ItemCard.svelte";

  const flipDurationMs = 150;

  export let column: Col;
  export let items: Item[];
  export let onUpdate: (column: Col, items: Item[]) => void;

  function handleDndConsiderCards(e: CustomEvent<DndEvent<Item>>) {
    items = e.detail.items;
  }

  function handleDndFinalizeCards(e: CustomEvent<DndEvent<Item>>) {
    const items = e.detail.items.map((item: Item) => ({ ...item, status: column }));
    onUpdate(column, items);
  }

  function handleOnDelete(id: number) {
    items = items.filter((item: Item) => item.id !== id);
    onUpdate(column, items);
  }
</script>

<div class="h-full flex flex-col pb-5">
  <div>
    <h2 class="text-xl text-center font-bold mb-5">
      {column}
    </h2>
  </div>
  <div
    class="grow border p-2"
    use:dndzone={{ items, flipDurationMs, zoneTabIndex: -1 }}
    on:consider={handleDndConsiderCards}
    on:finalize={handleDndFinalizeCards}
  >
    {#each items as item (item.id)}
      <div class="mb-2" animate:flip={{ duration: flipDurationMs }}>
        <ItemCard {item} onDelete={(id: number) => handleOnDelete(id)} />
      </div>
    {/each}
  </div>
</div>
