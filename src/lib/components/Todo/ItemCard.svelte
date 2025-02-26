<script lang="ts">
  import X from "lucide-svelte/icons/x";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import type { Item } from "$lib/types/todo";

  let { item, onDelete }: { item: Item; onDelete: (id: number) => void } = $props();
</script>

<Card.Root class="w-full cursor-grab hover:active:cursor-grabbing">
  <Card.Header>
    <Card.Title>
      <div class="flex flex-row items-center justify-between">
        <span>
          {item.name}
        </span>
        <span>
          <Button class="w-8 h-8" size="icon" variant="outline" onclick={() => onDelete(item.id)}>
            <X class="w-4 h-4" />
          </Button>
        </span>
      </div>
    </Card.Title>
  </Card.Header>
  <Card.Footer></Card.Footer>
</Card.Root>
