<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  import type { Item } from "$lib/types/todo";

  let { onCreate }: { onCreate: (item: Item) => void } = $props();
  let newTodoName: string = $state("");

  function onClick() {
    const newItem: Item = {
      id: Date.now(),
      name: newTodoName,
      status: "TODO",
      lastUpdated: Date.now(),
    };

    onCreate(newItem);
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "default" })}>Add todo</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title class="text-center">Create a todo</Dialog.Title>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input bind:value={newTodoName} id="name" class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: "default" })} onclick={onClick}
        >Create</Dialog.Close
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
