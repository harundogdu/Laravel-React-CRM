<?php

namespace App\Http\Controllers\api\product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Helper\fileUpload;
use App\Models\ProductImage;
use App\Models\ProductProperty;

use function PHPUnit\Framework\returnValue;

class indexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = request()->user();
        $product = Product::where('userId', $user->id)->get();
        return response()->json([
            'success' => true,
            'data' => ['user' => $user, 'product' => $product]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = request()->user();
        $categories = Category::where('userId', $user->id)->get();
        return response()->json([
            'success' => true,
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = request()->user();
        $all = $request->all();

        $all['userId'] = $user->id;
        $file = isset($all['file']) ? $all['file'] : [];
        $property = isset($all['property']) ? json_decode($all['property']) : [];
        unset($all['file']);
        unset($all['property']);

        $create = Product::create($all);

        if ($create) {
            foreach ($file as $item) {
                $upload = fileUpload::newUpload(rand(1, 900000), 'products', $item, 0);
                ProductImage::create([
                    'productId' => $create->id,
                    'path' => $upload
                ]);
            }

            foreach ($property as $item) {
                ProductProperty::create([
                    'productId' => $create->id,
                    'property' => $item->property,
                    'value' => $item->value
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Dosyalar Başarıyla Yüklendi!"
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = request()->user();
        $product = Product::whereId($id)->with('property')->with('images')->first();
        $categories = Category::where('userId', $user->id)->get();

        return response()->json([
            'success' => true,
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = request()->user();
        $control = Product::where('id', $id)->where('userId', $user->id)->count();
        if ($control == 0) {
            return response()->json(['success' => false, 'message' => 'Ürün size ait degil']);
        }

        $all = $request->all();
        $file = (isset($all['file'])) ? json_decode($all['file'], true) : [];
        $newFile = (isset($all['newFile'])) ? $all['newFile'] : [];
        $properties = (isset($all['property'])) ? json_decode($all['property'], true) : [];
       
        foreach ($file as $item) {
            if (isset($item['isRemove'])) {
                $productImage = ProductImage::where('id', $item['id'])->first();
                try {
                    unlink(public_path($productImage->image));
                } catch (\Exception $e) {
                }
                ProductImage::where('id', $item['id'])->delete();
            }
        }

        foreach ($newFile as $item) {

            $upload = fileUpload::newUpload(rand(1, 9000), "products", $item, 0);
            ProductImage::create([
                'productId' => $id,
                'path' => $upload
            ]);
        }

        ProductProperty::where('productId', $id)->delete();
        foreach ($properties as $property) {
            ProductProperty::create([
                'productId' => $id,
                'property' => $property['property'],
                'value' => $property['value']
            ]);
        }


        unset($all['file']);
        unset($all['newFile']);
        unset($all['_method']);
        unset($all['property']);
        $create = Product::where('id', $id)->update($all);
        if ($create) {

            return response()->json([
                'success' => true,
                'message' => 'Ürün Düzenleme Başarılı'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Ürün Eklenemedi'
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = request()->user();
        $product = Product::where([
            ['id', $id],
            ['userId', $user->id]
        ])->first();

        if ($product) {
            $productImage = ProductImage::where('productId', $product->id)->get();
            $productProperty = ProductProperty::where('productId', $product->id)->get();

            foreach ($productImage as $item) {
                try {
                    unlink(public_path($item->path));
                    ProductImage::where('id', $item->id)->delete();
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }

            foreach ($productProperty as $item) {
                try {
                    ProductProperty::where('id', $item->id)->delete();
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Ürün Başarıyla Silindi!'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Ürün Silinirken Bir Hata Oluştu!'
            ]);
        }
    }
}
