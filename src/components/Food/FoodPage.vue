<template>
    <div>
        <div class="header-stall">
            <div>Food Avaibility</div>
        </div>
        <div class="card-list">
            <div class="cards">
                <div class="card">
                    <div class="card-top">
                        <h3 class="card-title">
                            Food Name
                        </h3>
                    </div>
                    <img
                        class="card-img"
                        src="https://i.pinimg.com/564x/fa/e3/50/fae3500cc623c6b6051f33ef2dda9205.jpg"
                    />

                    <div class="card-content">
                        <div class="card-bottom">
                            <button class="button-live">
                                Available
                            </button>
                            <button class="button-live color-collected">
                                Sold
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-top">
                        <h3 class="card-title">
                            Food Name
                        </h3>
                    </div>
                    <img
                        class="card-img"
                        src="https://i.pinimg.com/564x/fa/e3/50/fae3500cc623c6b6051f33ef2dda9205.jpg"
                    />

                    <div class="card-content">
                        <div class="card-bottom">
                            <button class="button-live">
                                Available
                            </button>
                            <button class="button-live color-collected">
                                Sold
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-top">
                        <h3 class="card-title">
                            Food Name
                        </h3>
                    </div>
                    <img
                        class="card-img"
                        src="https://i.pinimg.com/564x/fa/e3/50/fae3500cc623c6b6051f33ef2dda9205.jpg"
                    />

                    <div class="card-content">
                        <div class="card-bottom">
                            <button class="button-live">
                                Available
                            </button>
                            <button class="button-live color-collected">
                                Sold
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
    .header-stall {
        display: flex;
        width: calc(100% - 40px);
        margin: 20px;
        justify-content: space-between;
        div {
            border: 2px solid #ddd;
            font-size: 25px;
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000;
            height: 60px;
            box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
        }
    }
    .card-list {
        padding: 0px 20px;
    }
    .cards {
        display: flex;
        flex-wrap: wrap;
        margin-left: calc(-1 * var(--spacing));
        --spacing: 30px;
        --columns: 4;
    }
    .card {
        border-radius: 20px;
        overflow: hidden;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        width: calc(calc(100% / var(--columns)) - var(--spacing));
    }

    @media screen and (max-width: 767px) {
    .cards {
        --spacing: 15px;
        --columns: 1;
        margin-bottom: -10px;
    }
    .card {
        margin-bottom: 10px;
    }
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    .cards {
        --spacing: 30px;
        --columns: 2;
        margin-bottom: -10px;
    }
    .card {
        margin-bottom: 10px;
    }
    }

    .card-img {
        height: 200px;
        width: 100%;
        object-fit: cover;
        flex-shrink: 0;
    }
    .card-top {
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-title {
        font-weight: 500;
        margin-bottom: 25px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .card-bottom {
        padding: 25px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        flex-shrink: 0;
    }

    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .button-live {
        background: #e09c48;
        transition: all 0.25s ease-out;
        height: 40px;
        border: none;
        width: 110px;
        color: #fff;
        font-size: 18px;
        border-radius: 20px;
    }
    .button-live:hover {
        position: relative;
        top: -2px;
        box-shadow: -6px 14px 12px 2px rgba(90, 90, 90, .12);
    }
    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .color-collected {
        background: #24a058;
    }
</style>