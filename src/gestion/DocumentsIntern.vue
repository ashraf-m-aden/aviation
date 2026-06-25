<template>
  <DocumentsManager :intern="true" />
</template>

<script>
import DocumentsManager from "./DocumentManager.vue";
export default {
  name: "DocumentsIntern",
  components: { DocumentsManager },
};
</script>
