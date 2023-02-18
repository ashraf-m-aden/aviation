<template>
  <div class="container">
    <div class="row">
      <div class="col-12 m-5">Agence / Publications / Home</div>

      <div class="col-12 col-md-8">
        <h3>Accords internationaux</h3>

        <div class="m-5 p5 d-flex flex-column align-items-center">
          <div class="input-group w-50">
            <input
              type="text"
              class="form-control border-info input"
              placeholder="Search"
            />
            <div class="input-group-append border-info">
              <button class="input btn-outline-info" type="submit">Go</button>
            </div>
          </div>
          <div class="card result w-100" v-show="searchResults.length > 0">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Titre</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in searchResults" :key="index">
                  <th>
                    <img src="../../../assets/pdf.png" width="20" alt="" />
                  </th>
                  <td>{{ item.title }}</td>
                  <td>{{ item.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="table card">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titre</th>
                <th scope="col">Date de parution</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <th><img src="../../../assets/pdf.png" width="20" alt="" /></th>
                <td>{{ item.title }}</td>
                <td>{{ item.date }}</td>
                <td><button>Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {   

  metaInfo() {
    // if no subcomponents specify a metaInfo.title, this title will be used
    return {
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
        {
          name: "googlebot",
          content: "noindex",
        },
      ],
    };
  },

  data() {
    return {
      searchResults: [],
      data: [
        {
          id: 1,
          title: "Safety & Security",
          date: "02/10/2020",
          action: "Download",
        },
        {
          id: 1,
          title: "Safety & Security",
          date: "02/10/2020",
          action: "Download",
        },
        {
          id: 1,
          title: "Safety & Security",
          date: "02/10/2020",
          action: "Download",
        },
        {
          id: 1,
          title: "Safety & Security",
          date: "02/10/2020",
          action: "Download",
        },
      ],
    };
  },
  methods: {
    search(event) {
      console.log(event);
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>

<style lang="css" scoped>
.search {
  border: none;
}
</style>
